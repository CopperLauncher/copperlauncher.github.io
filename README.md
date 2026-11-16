# Copper Android — Website

Static, single-page website for [Copper Launcher](https://github.com/CopperLauncher/Copper-Android), a Minecraft: Java Edition launcher for Android. Designed in Material 3 Expressive.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole page: hero, features, screenshots, wiki, FAQ, roadmap, community, credits |
| `style.css` | Design tokens (light/dark), components and layout |
| `index.js` | Theme toggle, EN/RU language, nav highlighting, tabs, dialogs, live release notes |
| `images/` | Logo (also the favicon) and app screenshots |

## Run it

No build step. Open `index.html` in a browser, or serve the folder with any static host (GitHub Pages, Netlify, `python3 -m http.server`).

## Notes

- **Release notes:** the version badge in the hero opens the latest GitHub release notes. They are fetched from the GitHub API, cached for 5 minutes, and re-checked automatically while the page is open.
- **Fonts:** Google Sans Flex loads from Google Fonts; the page falls back to system fonts if it can't.
- **Languages:** English and Russian. Add a language by extending the `RU`-style dictionary in `index.js`; missing keys fall back to English.

## Credits

Design inspired by [PixelPlayer Web](https://pixelplayer.netlify.app) ([PixelPlayer](https://github.com/PixelPlayerHQ/PixelPlayer)). Launcher and third-party credits are listed on the site's Credits section.
