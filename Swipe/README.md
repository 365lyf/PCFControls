# Swipe - PCF Control
A  PCF Control to detect swiping on Canvas apps.

## Input Parameters 
Has one configuration option:
* startFromEdge: boolean - set to True if you want to only detect swipes only from the edge of the screen.

## Output Parameters 
Bind your other actions/controls to these output values:
* downSwipe: boolean - updates when downswipe is detected
* upSwipe: boolean - updates when upswipe is detected
* leftSwipe: boolean - updates when upswipe is detected
* rightSwipe: boolean - updates when upswipe is detected
      
## Output Parameters (for Debugging)
Additional debug parameters:
* windowHeightDetected: number - current screen height
* windowWidthDetected: number - current screen width
* xStartDetected: number - starting X coordinates of the swipe
* yStartDetected: number - starting Y coordinates of the swipe
      
      
