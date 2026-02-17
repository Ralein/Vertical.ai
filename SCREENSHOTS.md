# How to Capture Screenshots

## For macOS:

### Full Dashboard Screenshot
1. Open http://localhost:3000 in your browser
2. Press `Cmd + Shift + 4` then press `Space`
3. Click on the browser window to capture it
4. Save as `dashboard-full.png`

### Specific Section Screenshots
1. Press `Cmd + Shift + 4`
2. Drag to select the area you want to capture
3. Release to take the screenshot

### Mobile View Screenshot
1. Open Chrome DevTools (`Cmd + Option + I`)
2. Click the device toolbar icon (or press `Cmd + Shift + M`)
3. Select a mobile device (e.g., iPhone 12 Pro)
4. Take screenshot using the method above
5. Save as `dashboard-mobile.png`

## Recommended Screenshots:

1. **dashboard-full.png** - Full page view showing all components
2. **kpi-cards.png** - Close-up of the KPI cards section
3. **charts.png** - Sales trend and lead distribution charts
4. **lead-table.png** - Lead status distribution table
5. **mobile-view.png** - Mobile responsive layout
6. **date-filter.png** - Date range filter in action

## After Capturing:

1. Create a `screenshots` folder in the project root:
   ```bash
   mkdir screenshots
   ```

2. Move all screenshots to this folder

3. Update README.md to include the screenshots:
   ```markdown
   ## Screenshots
   
   ### Desktop View
   ![Dashboard Overview](screenshots/dashboard-full.png)
   
   ### KPI Cards
   ![KPI Cards](screenshots/kpi-cards.png)
   
   ### Charts
   ![Charts](screenshots/charts.png)
   
   ### Mobile View
   ![Mobile Responsive](screenshots/mobile-view.png)
   ```

4. Commit and push:
   ```bash
   git add screenshots/
   git commit -m "Add dashboard screenshots"
   git push origin main
   ```

## Tips:

- Use a clean browser window (close unnecessary tabs)
- Make sure the dashboard has loaded completely
- Capture at 1366x768 or higher resolution
- Use light mode for better visibility
- Show the date filter dropdown open in one screenshot
- Hover over a chart to show tooltips in action
