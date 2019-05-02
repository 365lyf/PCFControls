# PCF Controls

Just a repo of controls that might be useful to the community.  I'm building out a catalogue of these as I try to get a handle on what the best practices are for building out controls.

Catalogue so far includes:
* Number Button Selector (a simple incrementor that has plus/minus buttons)
* Countdown Timer (a simple countdown timer showing days/hours/minutes/seconds until date)

# To Build
Set up your environment as per the following DOCS article:
https://docs.microsoft.com/en-us/powerapps/developer/component-framework/create-custom-controls-using-pcf

Download the files contained within the control.. e.g. NumberButtonSelector/ControlManifest.Input.xml, NumberButtonSelector/index.ts, NumberButtonSelector/css/NumberButtonSelector.css

Then open that directory, and execute "npm run build".  This transcompilates the TS to normal JS.

Then execute "npm start".  This attacheds to the control to a test harness, so you can test the control works.

# To Publish
Set up your publisher information:
"pac solution init --publisherName <enter your publisher name> --customizationPrefix <enter your publisher name>"

Reference your solution.
"pac solution add-reference --path <path or relative path of your PowerApps component framework project on disk>"
  
Run the following.
"msbuild /t:restore" followed by then "msbuild"  (this step needs to be done within Developer Command Prompt for VS)

It will output a solution file to your publishing directory/out/debug folder

# Upload to D365

Upload, and use as you would any other control.  i.e. goto a form, add an element, click on properties, then control, then add custom control.
