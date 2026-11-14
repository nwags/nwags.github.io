"""Static public-embed contract; no network or Power BI credentials required."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
import unittest

ROOT = Path(__file__).resolve().parents[2]
PAGE = ROOT / 'lca-waterworks-powerbi' / 'index.html'
EXPECTED = ('https://app.powerbi.com/view?r='
            'eyJrIjoiZjRjZTRhZmQtNzY1NC00ZDZiLWE5ZGItMjM3MjQ4MzRmMjdiIiwidCI6ImNjYWMwOGY0LWYyNDktNDM2Zi1iY2Q0LWFmNDk2NmRjMzAwYyJ9'
            '&pageName=Overview')

class Tags(HTMLParser):
    def __init__(self):
        super().__init__()
        self.items = []
    def handle_starttag(self, tag, attributes):
        self.items.append((tag, dict(attributes)))

class EmbedContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = PAGE.read_text(encoding='utf-8')
        cls.tags = Tags()
        cls.tags.feed(cls.text)

    def test_exact_public_iframe(self):
        frames = [a for t, a in self.tags.items if t == 'iframe']
        self.assertEqual(len(frames), 1)
        f = frames[0]
        self.assertEqual(f.get('src'), EXPECTED)
        self.assertEqual(parse_qs(urlsplit(f['src']).query)['pageName'], ['Overview'])
        self.assertNotIn('hidden', f)
        self.assertIn('allowfullscreen', f)
        self.assertTrue(f.get('title'))

    def test_matching_public_fallback_links(self):
        links = [a for t, a in self.tags.items if t == 'a' and a.get('href') == EXPECTED]
        self.assertEqual(len(links), 2)
        for a in links:
            self.assertEqual(a.get('target'), '_blank')
            self.assertIn('noopener', a.get('rel', ''))

    def test_persistent_independence_notice(self):
        notices = [a for t, a in self.tags.items if t == 'aside' and a.get('class') == 'independence-banner']
        self.assertEqual(len(notices), 1)
        self.assertIn('not affiliated with or endorsed', self.text)
        css = (ROOT / 'lca-waterworks' / 'site-notice.css').read_text(encoding='utf-8')
        self.assertIn('position:sticky', css)
        self.assertIn('top:0', css)
        self.assertTrue(any(t == 'link' and a.get('href', '').startswith('../lca-waterworks/site-notice.css') for t, a in self.tags.items))

    def test_scope_and_parallel_site(self):
        self.assertIn('does not recalculate arbitrary new assumptions or run a live optimizer', self.text)
        self.assertIn('November 7, 2026', self.text)
        self.assertIn('5,000 billable gallons', self.text)
        self.assertTrue(any(t == 'a' and a.get('href') == '../lca-waterworks/' for t, a in self.tags.items))
        self.assertNotIn('Report connection pending', self.text)

    def test_no_host_engine_and_no_pending_noindex(self):
        self.assertFalse(any(t == 'script' for t, _ in self.tags.items))
        self.assertFalse(any(t == 'meta' and a.get('name') == 'robots' and 'noindex' in a.get('content', '') for t, a in self.tags.items))
        self.assertNotIn('accessToken', self.text)

    def test_unique_ids_and_valid_descriptions(self):
        ids = [a['id'] for _, a in self.tags.items if 'id' in a]
        self.assertEqual(len(ids), len(set(ids)))
        for _, attrs in self.tags.items:
            for key in ('aria-describedby', 'aria-labelledby'):
                for target in attrs.get(key, '').split():
                    self.assertIn(target, ids)

if __name__ == '__main__':
    unittest.main()
