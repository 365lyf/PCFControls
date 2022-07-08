/**
 * Andrew Ly (365lyf)
 * https://365lyf.com
 * (c) 2022
 * 
 * This is an example PCF implementation of the jsPDF library by James Hall, https://github.com/MrRio/jsPDF.
 */

import {IInputs, IOutputs} from "./generated/ManifestTypes";

import { jsPDF } from "jspdf";
import { debug } from "console";




export class SaveAsPDFControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {



	// value of our field is stored to this variable
	private _value: string;

    // jsPDF options
    private _jsPDF_orientation: 'portrait';
    private _jsPDF_unit: 'mm';
    private _jsPDF_format: 'a4';
    private _jsPDF_defaultSaveFilename: 'jsPDF_PCF.pdf';
    
    /*
    // not currently supported 
    private _jsPDF_StartingX:  10;
    private _jsPDF_StartingY:  10;
    private _jsPDF_putOnlyUsedFonts: true;
    private _jsPDF_compress: false;
    private _jsPDF_precision: 16;
    private _jsPDF_userUnit: 1.0;
    private _jsPDF_encryption: object;
    */

	// PCF framework to notify of changes
	private _notifyOutputChanged: () => void;

	// We want a container to store all the elements
	private _container: HTMLDivElement;
    private _buttonElement: HTMLButtonElement;
    private _inputElement: HTMLInputElement;


	// Event handler 'refreshData' reference
	private _exportToPDF: EventListenerOrEventListenerObject;

    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        
        // Add control initialization code     

		this._container = document.createElement("div");
		this._exportToPDF= this.exportToPDF.bind(this);

        // create the input element
		this._inputElement = document.createElement("input");        

		// create the button button
		this._buttonElement = document.createElement("button");
		this._buttonElement.setAttribute("type", "button");
		this._buttonElement.innerText = "Export to PDF";
		this._buttonElement.addEventListener("click", this._exportToPDF);

        
		
		// append everything to the div
		this._container.append(this._inputElement);
        this._container.append(this._buttonElement);

		// append this to the param container
		container.appendChild(this._container);
        this._notifyOutputChanged = notifyOutputChanged;
    }


   	
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
       this._value = context.parameters.textAreaField.raw ?? "";

       if( this._value == ""){	
            console.log("No value");            
       }

       this._inputElement.value = this._value;
       
       
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
                
        return {                        
            textAreaField: this._value            
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
       this._buttonElement.removeEventListener("click", this.exportToPDF);		
		
    }



    /**
     * Export to PDF
     */
	public exportToPDF( )
	{          

        
        // Landscape export, 2×4 inches
        var doc = new jsPDF({
        orientation: this._jsPDF_orientation,
        unit: this._jsPDF_unit,
        format: this._jsPDF_format
        });

        /*  // Fonts not currently supported in this PCF control
        const myFont = ... // load the *.ttf font file as binary string

        // add the font to jsPDF
        doc.addFileToVFS("MyFont.ttf", myFont);
        doc.addFont("MyFont.ttf", "MyFont", "normal");
        doc.setFont("MyFont");
        */
        doc.text (this._value, 10, 10);        
        //doc.text (this._value, this._jsPDF_StartingX, this._jsPDF_StartingY);
        doc.save (this._jsPDF_defaultSaveFilename);	
	}
}
