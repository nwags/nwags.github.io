#!/usr/bin/env python3
"""Render a text-searchable, two-page PDF of the canonical web resume.
Requires beautifulsoup4 and weasyprint. All content comes from resume.html;
external CSS/fonts are not fetched. No publication or repository operation.
"""
import argparse
from pathlib import Path
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from weasyprint import HTML

CSS = '''
@page {size: Letter; margin: 0.38in 0.43in 0.39in;}
* {box-sizing:border-box;} body {font-family: 'Liberation Sans', sans-serif; font-size:9.5pt; line-height:1.16; color:#20262c; margin:0;}
.resume-header {text-align:center; margin:0 0 5pt;} h1 {font-family:'Liberation Serif', serif; font-size:21pt; line-height:1.12; margin:0 0 3pt;}
.resume-header p {font-size:9pt; color:#40505c; margin:0 0 2.5pt;}
a {color:#185a6d; text-decoration:none;} h2 {font-size:9.5pt; letter-spacing:.85pt; text-transform:uppercase; border-top:.5pt solid #c6ced2; padding-top:5pt; margin:5pt 0 3pt; break-after:avoid; color:#344653;}
h3 {font-size:9.7pt; margin:0 0 1.4pt; line-height:1.22;} p {margin:0 0 3pt;}
.entry {margin:0 0 3pt; break-inside:avoid;} .entry-meta {font-size:9pt; color:#53616b; margin:0 0 2.5pt;}
ul {margin:0 0 2pt; padding-left:15pt;} li {margin:0 0 0.7pt; padding-left:0;}
'''

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site-root',type=Path,default=Path(__file__).resolve().parents[1])
    parser.add_argument('--output',type=Path)
    args=parser.parse_args(); site=args.site_root.resolve(); out=args.output or site/'docs/NickWagner_Resume.pdf'
    soup=BeautifulSoup((site/'resume.html').read_text(), 'html.parser')
    article=soup.select_one('article.resume-sheet')
    if article is None or len(article.select('section.resume-section'))!=6:
        raise ValueError('Unexpected resume structure')
    for a in article.select('a[href]'):
        a['href']=urljoin('https://nwags.com/resume.html',a['href'])
        if not a['href'].startswith('https://'):
            raise ValueError('Unexpected non-HTTPS resume link')
    # Only the local article and inline print CSS enter the renderer.
    doc=HTML(string=f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Nicholas Wagner | Resume</title><style>{CSS}</style></head><body>{article}</body></html>').render()
    if len(doc.pages)!=2:
        raise ValueError(f'Expected a two-page resume, got {len(doc.pages)} pages')
    out.parent.mkdir(parents=True,exist_ok=True);doc.write_pdf(out);print(out)
if __name__=='__main__':main()
