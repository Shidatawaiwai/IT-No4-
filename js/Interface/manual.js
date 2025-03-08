class manualAppearDisappear{
    constructor(manualId,buttonId){
        this.manualId = manualId;
        this.buttonId = buttonId;
    }
    getSelector(){
        this.manualSelector =  $("#"+this.manualId);
        this.htmlText = this.manualSelector.html();
        this.btn = $("#"+this.buttonId);
        this.returnObj = {
            selector : this.manualSelector,
            htmlText : this.htmlText,
            btnSelector : this.btn,
        };
        return this.returnObj;
    }

    manualAppear(selectorObj){
        selectorObj.selector.height(selectorObj.height);
        selectorObj.selector.html(selectorObj.htmlText);
        selectorObj.btnSelector.val("非表示");
    }

    manualDisappear(selectorObj){
        selectorObj.selector.html(null);
        selectorObj.btnSelector.val("表示");
    }
    
}
//export default manualAppearDisappear;