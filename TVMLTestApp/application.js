//# sourceURL=application.js

//
//  application.js
//  TVMLTestApp
//
//  Created by Christian Borsato on 22/02/2018.
//  Copyright © 2018 Christian Borsato. All rights reserved.
//

/*
 * This file provides an example skeletal stub for the server-side implementation 
 * of a TVML application.
 *
 * A javascript file such as this should be provided at the tvBootURL that is 
 * configured in the AppDelegate of the TVML application. Note that  the various 
 * javascript functions here are referenced by name in the AppDelegate. This skeletal 
 * implementation shows the basic entry points that you will want to handle 
 * application lifecycle events.
 */

/**
 * @description The onLaunch callback is invoked after the application JavaScript 
 * has been parsed into a JavaScript context. The handler is passed an object 
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the 
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents 
 * the URL that was used to retrieve the application JavaScript.
 */
App.onLaunch = function(options) {
    showLoadingTemplate()
}


App.onWillResignActive = function() {

}

App.onDidEnterBackground = function() {

}

App.onWillEnterForeground = function() {
    
}

App.onDidBecomeActive = function() {
    
}

App.onWillTerminate = function() {
    
}


/**
 * This convenience funnction returns an alert template, which can be used to present errors to the user.
 */
var createAlert = function(title, description) {

    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate>
            <title>${title}</title>
            <description>${description}</description>
          </alertTemplate>
        </document>`

    var parser = new DOMParser();

    var alertDoc = parser.parseFromString(alertString, "application/xml");

    return alertDoc
}

// Show Loading

function showLoadingTemplate() {
    
    var resource = '<document><loadingTemplate><activityIndicator><text>Loading</text></activityIndicator></loadingTemplate></document>';
    var parser = new DOMParser();
    var doc = parser.parseFromString(resource, "application/xml");
    navigationDocument.pushDocument(doc);
}

// Home

var HomeTemplateGrid = function() {
    let template = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
        <stackTemplate>
            <banner>
                <title>TVML Test</title>
            </banner>
            <collectionList>
                <grid>
                    <prototypes>
                        <lockup prototype="home">
                            <img binding="@src:{thumb};" width="350" height="250"/>
                            <title binding="textContent:{title};"/>
                        </lockup>
                    </prototypes>
                    <section binding="items:{images};"/>
                </grid>
            </collectionList>
        </stackTemplate>
    </document>`;
    return new DOMParser().parseFromString(template, "application/xml");
}

var HomeTemplateCarousel = function() {
    let template = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
        <stackTemplate>
            <banner>
                <title>TVML Test</title>
            </banner>
            <collectionList>
                <carousel>
                    <prototypes>
                        <lockup prototype="home">
                            <img binding="@src:{thumb};" width="350" height="250"/>
                            <title binding="textContent:{title};"/>
                        </lockup>
                    </prototypes>
                <section binding="items:{images};"/>
                </carousel>
            </collectionList>
        </stackTemplate>
    </document>`;
    return new DOMParser().parseFromString(template, "application/xml");
}

// params: json: String, carousel: Bool
function showHomeTemplate(json, carousel) {
    
    var results = JSON.parse(json)
    
    var templateDoc = (carousel) ? HomeTemplateCarousel() : HomeTemplateGrid()
    navigationDocument.replaceDocument(templateDoc, getActiveDocument())
    
    console.log(templateDoc)
    var element = templateDoc.getElementsByTagName((carousel) ? "carousel" : "grid").item(0)
    var section = element.getElementsByTagName("section").item(0)
    
    //create an empty data item for the section
    section.dataItem = new DataItem()
    
    //create data items from objects
    var newItems = results.map((result) => {
                               let objectItem = new DataItem(result.type, result.id);
                               objectItem.thumb = result.thumb;
                               objectItem.title = result.title;
                               objectItem.items = result.items;
                               return objectItem;
                               });
    
    //add the data items to the section's data item; 'items' relates to the binding name in the protoype where items:{items} is all of the newItems being added to the sections' data item;
    section.dataItem.setPropertyPath("images", newItems)
}
