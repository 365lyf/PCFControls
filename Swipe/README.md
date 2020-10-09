# Swipe - PCF Control
A  PCF Control to detect swiping on Canvas apps.

Takes one input parameter
* startFromEdge: boolean - set to True if you want to only detect swipes only from the edge of the screen.

Has a number of output parameters, 
* downSwipe: boolean - updates when downswipe is detected
* upSwipe: boolean - updates when upswipe is detected
* leftSwipe: boolean - updates when upswipe is detected
* rightSwipe: boolean - updates when upswipe is detected
      
and some debug parameters,      
* windowHeightDetected: number - current screen height
* windowWidthDetected: number - current screen width
* xStartDetected: number - starting X coordinates of the swipe
* yStartDetected: number - starting Y coordinates of the swipe
      
      
