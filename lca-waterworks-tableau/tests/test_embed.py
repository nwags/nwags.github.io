"""Offline host contracts; does not claim that Tableau's remote report rendered."""
from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'lca-waterworks-tableau'
VIEW = 'WaterWorksOverviewandFinancing/01Overview'
DIRECT = f'https://public.tableau.com/views/{VIEW}?:showVizHome=no&:tabs=yes&:toolbar=yes'

class Elements(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.items = []
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        self.items.append((tag, dict(attrs)))

class EmbedContracts(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (SITE / 'index.html').read_text(encoding='utf-8')
        cls.js = (SITE / 'embed.js').read_text(encoding='utf-8')
        cls.css = (SITE / 'styles.css').read_text(encoding='utf-8')
        cls.items = Elements(cls.html).items
        cls.params = {a['name']: a['value'] for t, a in cls.items if t == 'param'}
    def test_exact_supplied_workbook_identity(self):
        self.assertEqual(self.params['name'], VIEW)
        self.assertEqual(self.params['host_url'], 'https%3A%2F%2Fpublic.tableau.com%2F')
        self.assertEqual(self.params['static_image'], f'https://public.tableau.com/static/images/Wa/{VIEW}/1.png')
    def test_tabs_toolbar_and_default_view(self):
        self.assertEqual(self.params['tabs'], 'yes')
        self.assertEqual(self.params['toolbar'], 'yes')
        self.assertEqual(self.params['embed_code_version'], '3')
    def test_direct_fallbacks(self):
        refs = [a for t, a in self.items if t == 'a' and a.get('href','').startswith('https://public.tableau.com/')]
        self.assertEqual(len(refs), 4)
        for a in refs:
            self.assertEqual(a['href'], DIRECT)
            self.assertEqual(a.get('target'), '_blank')
            self.assertIn('noopener', a.get('rel',''))
    def test_active_and_accurate_scope(self):
        self.assertNotIn('noindex', self.html)
        self.assertNotIn('connection pending', self.html.lower())
        self.assertIn('data-publication-state="embedded"', self.html)
        self.assertIn('10 dashboards + arithmetic audit', self.html)
        self.assertIn('eleventh tab', self.html)
        self.assertIn('independently selectable comparator', self.html)
        self.assertIn('Overview retains', self.html)
        self.assertNotIn('Additional views are still planned', self.html)
        self.assertNotIn('Two dashboards', self.html)
        self.assertIn('does not recalculate arbitrary', self.html)
        self.assertIn('November 7, 2026', self.html)
    def test_notice_navigation_and_accessible_ids(self):
        ids = [a['id'] for _, a in self.items if 'id' in a]
        self.assertEqual(len(ids), len(set(ids)))
        self.assertIn('class="independence-banner"', self.html)
        self.assertIn('../lca-waterworks/site-notice.css?v=010', self.html)
        for p in ('../lca-waterworks/','../lca-waterworks-powerbi/','../lca-waterworks/model.html','../lca-waterworks/glossary.html'):
            self.assertIn(f'href="{p}"', self.html)
        self.assertIn('tabindex="0"', self.html)
        self.assertIn('aria-describedby="report-help sizing-help"', self.html)
    def test_loader_and_tall_dashboard(self):
        self.assertIn("script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'", self.js)
        self.assertIn("viz.style.width = '1280px'", self.js)
        self.assertIn("viz.style.height = '1420px'", self.js)
        self.assertIn("addEventListener('error'", self.js)
        self.assertIn('overflow-x:auto', self.css)
    def test_no_script_is_identified_as_preview(self):
        self.assertIn('<noscript>', self.html)
        self.assertIn('static preview', self.html)
        self.assertIn('not interactive', self.html)
    def test_three_separate_homepage_editions(self):
        text = (ROOT / 'index.html').read_text(encoding='utf-8')
        links = [a['href'] for t, a in Elements(text).items if t == 'a' and a.get('class') == 'waterworks-edition']
        self.assertEqual(links, ['lca-waterworks/','lca-waterworks-powerbi/','lca-waterworks-tableau/'])
        self.assertIn('Three online versions', text)
        self.assertIn('Ten dashboards plus an arithmetic audit', text)
        self.assertNotIn('Initial Overview and Financing edition', text)
        self.assertIn('grid-template-columns: minmax(0, 1fr)', text)

if __name__ == '__main__':
    unittest.main()
