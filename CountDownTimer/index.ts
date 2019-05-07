import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class CountDownTimer implements ComponentFramework.StandardControl<IInputs, IOutputs> {


		// value of our field is stored to this variable
		private _value: Date;
		private _pastDateText: string;

		// PCF framework to notify of changes
		private _notifyOutputChanged: () => void;
	
		// We want an input field for number value
		private inputElement : HTMLInputElement;
	
		// We want Months, Days, Hours, Seconds labels
		private spanDays : HTMLSpanElement;
		private spanHrs : HTMLSpanElement;
		private spanMins : HTMLSpanElement;
		private spanSecs : HTMLSpanElement; 

		// We want Months, Days, Hours, Seconds labels
		private spanDaysSeparator : HTMLSpanElement;
		private spanHrsSeparator : HTMLSpanElement;
		private spanMinsSeparator : HTMLSpanElement;
		private spanSecsSeparator : HTMLSpanElement; 

		// We want Past date label
		private spanPastDate : HTMLSpanElement;
		
		// We want a container to store all the elements
		private _container: HTMLDivElement;
		private _break: HTMLBRElement;
		private _countdowncontainer: HTMLDivElement;
	
	
		// Event handler 'refreshData' reference
		private _refreshData: EventListenerOrEventListenerObject;
	


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
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
			this._container = document.createElement("div");
			this._countdowncontainer = document.createElement("div");
			this._break = document.createElement("br");
			this._notifyOutputChanged = notifyOutputChanged;
			this._refreshData = this.refreshData.bind(this);
			this._pastDateText = "PAST DATE";


			// create the input element
			this.inputElement = document.createElement("input");
			this.inputElement.setAttribute("type","date");			
			this.inputElement.addEventListener("input", this._refreshData) ;

			// create the countdown date elements
			this.spanDays = document.createElement("span");
			this.spanDays.setAttribute("class", "digit");
            this.spanDays.setAttribute("id","lblDays");
			this.spanDaysSeparator = document.createElement("span");
			this.spanDaysSeparator.setAttribute("class", "digit-separator");
			this.spanDaysSeparator.innerHTML = "d"

			// create the countdown date elements
			this.spanHrs = document.createElement("span");
			this.spanHrs.setAttribute("class", "digit");
            this.spanHrs.setAttribute("id","lblDays");
			this.spanHrsSeparator = document.createElement("span");
			this.spanHrsSeparator.setAttribute("class", "digit-separator");
			this.spanHrsSeparator.innerHTML = "h"


			// create the countdown date elements
			this.spanMins = document.createElement("span");
			this.spanMins.setAttribute("class", "digit");
			this.spanMins.setAttribute("id","lblMins");
			this.spanMinsSeparator = document.createElement("span");
			this.spanMinsSeparator.setAttribute("class", "digit-separator");
			this.spanMinsSeparator.innerHTML = "m"			
			
			// create the countdown date elements
			this.spanSecs = document.createElement("span");
			this.spanSecs.setAttribute("class", "digit");
            this.spanSecs.setAttribute("id","lblDays");
			this.spanSecsSeparator = document.createElement("span");
			this.spanSecsSeparator.setAttribute("class", "digit-separator");
			this.spanSecsSeparator.innerHTML = "s"			

			// create the past date element
			this.spanPastDate = document.createElement("span");
			this.spanPastDate.setAttribute("class", "pastdate")
			this.spanPastDate.setAttribute("id", "lblPastDate");
			this.spanPastDate.innerHTML = this._pastDateText;

			// append everything to the div
			this._container.append(this.inputElement);
			this._countdowncontainer.append(this.spanDays);			
			this._countdowncontainer.append(this.spanDaysSeparator);						
			this._countdowncontainer.append(this.spanHrs);
			this._countdowncontainer.append(this.spanHrsSeparator);						
			this._countdowncontainer.append(this.spanMins);			
			this._countdowncontainer.append(this.spanMinsSeparator);						
			this._countdowncontainer.append(this.spanSecs);
			this._countdowncontainer.append(this.spanSecsSeparator);						
			this._countdowncontainer.append(this.spanPastDate);						

	
			// append this to the param container
			container.appendChild(this._container);
			container.appendChild(this._break);
			container.appendChild(this._countdowncontainer);

			this.recalculateTimer();

	}


	/** Refresh our inputvalue for harness
	 * 
	 */
	public refreshData() {
				
		this._value = new Date(this.inputElement.value);		
		this._notifyOutputChanged();
		this.recalculateTimer();
	}


	

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.refreshData();

	}

	/**
	 * Recalculate the timer
	 */
	public recalculateTimer(){

		
		// Get todays date and time
		var now = new Date().getTime();
		var countDownDate = new Date(this.inputElement.value as any).getTime();	

		if ( !isNaN(countDownDate) ){

			// Find the distance between now and the count down date
			var distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// If the count down is finished, write some text 
			if (distance < 0) {
				this.setHiddenDateTimeElements( true );
				this.setHiddenPastDateElement( false );
			}else{
				this.setHiddenDateTimeElements( false );
				this.setHiddenPastDateElement( true );
				this.spanDays.innerHTML = days.toString();
				this.spanHrs.innerHTML = hours.toString();
				this.spanMins.innerHTML = minutes.toString();
				this.spanSecs.innerHTML = seconds.toString();
			}
		}else{
			this.setHiddenDateTimeElements( true );
			this.setHiddenPastDateElement( true );
		}
	}


	/**
	 * This function hides the day/hr/min/secs elements
	 * @param isHidden hides if this is true
	 */
	public setHiddenDateTimeElements( isHidden : boolean ){
		this.spanDays.hidden = isHidden;
		this.spanHrs.hidden = isHidden;
		this.spanMins.hidden = isHidden;
		this.spanSecs.hidden = isHidden;

		// set separator visibility
		this.spanDaysSeparator.hidden = isHidden;
		this.spanHrsSeparator.hidden = isHidden;
		this.spanMinsSeparator.hidden = isHidden;
		this.spanSecsSeparator.hidden = isHidden;
	}

	/**
	 * This function hides the 'past date' element
	 * @param isHidden hides if this is true
	 */
	public setHiddenPastDateElement( isHidden : boolean ){
		this.spanPastDate.hidden = isHidden;
	}


	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {			
			inputDate: this._value
		}
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		this.inputElement.removeEventListener("input", this._refreshData);
	}
}