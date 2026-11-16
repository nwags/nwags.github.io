"""Public host navigation contracts; no third-party report is executed."""
from html.parser import HTMLParser
from pathlib import Path
import unittest
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[2]
EDITIONS = ('lca-waterworks', 'lca-waterworks-powerbi', 'lca-waterworks-tableau')

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_header = False
        self.header_links = []
        self.all_links = []
        self.ids = []
        self.params = {}
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'header':
            self.in_header = True
        if 'id' in a:
            self.ids.append(a['id'])
        if tag == 'a' and 'href' in a:
            self.all_links.append(a['href'])
            if self.in_header:
                self.header_links.append(a['href'])
        if tag == 'param':
            self.params[a.get('name')] = a.get('value')
    def handle_endtag(self, tag):
        if tag == 'header':
            self.in_header = False

def read_page(edition):
    text = (ROOT / edition / 'index.html').read_text(encoding='utf-8')
    parsed = Links()
    parsed.feed(text)
    return text, parsed

class NavigationTests(unittest.TestCase):
    def test_every_header_links_to_both_other_editions(self):
        for edition in EDITIONS:
            _, page = read_page(edition)
            base = f'https://nwags.com/{edition}/'
            targets = {urlparse(urljoin(base, href)).path for href in page.header_links}
            for other in EDITIONS:
                if other != edition:
                    with self.subTest(source=edition, target=other):
                        self.assertIn(f'/{other}/', targets)
    def test_cross_edition_targets_exist(self):
        for edition in EDITIONS:
            _, page = read_page(edition)
            for href in page.all_links:
                url = urlparse(urljoin(f'https://nwags.com/{edition}/', href))
                if url.netloc == 'nwags.com' and url.path.strip('/') in EDITIONS:
                    self.assertTrue((ROOT / url.path.strip('/') / 'index.html').is_file())
    def test_stale_pending_embed_label_removed(self):
        for edition in EDITIONS:
            text, _ = read_page(edition)
            self.assertNotIn('embed pending', text.lower())
    def test_notices_and_scope_preserved(self):
        for edition in EDITIONS:
            text, page = read_page(edition)
            self.assertIn('independence-banner', text)
            self.assertIn('not affiliated with or endorsed', text)
            self.assertEqual(len(page.ids), len(set(page.ids)))
        text, page = read_page('lca-waterworks-tableau')
        self.assertEqual(page.params['name'], 'WaterWorksOverviewandFinancing/01Overview')
        self.assertEqual(page.params['tabs'], 'yes')
        self.assertEqual(page.params['toolbar'], 'yes')
        self.assertIn('Additional views are still planned', text)

if __name__ == '__main__':
    unittest.main()
