let dateInstanceMethods = [
    "getDate", "getDay", "getFullYear", "getHours", "getMilliseconds",
    "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset",
    "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours",
    "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds",
    "getYear", "setDate", "setFullYear", "setHours", "setMilliseconds",
    "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate",
    "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear",
    "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth",
    "setUTCSeconds", "setYear", "toDateString", "toISOString", "toJSON",
    "toGMTString", "toLocaleString", "toLocaleFormat", "toLocaleString",
    "toLocaleTimeString", "toString", "toTimeString", "toUTCString",
    "valueOf"];

let NativeDate = window.Date;
let startDate = new NativeDate();
let speedupFactor = 2.4;
let factorAdjustment = 0; // used when the speedup factor changes and the startDate is reset....

let CustomDate = function(){
    let args = [].slice.apply(arguments);
    let definedArgs = []; // need to filter because we use `args.join` later
    for (let i=0; i< args.length; i++)
    {
        if (args[i] !== undefined)
        {
            definedArgs.push(args[i]);
        }
    }
    args = definedArgs;

    if (! (args[0] instanceof CustomDate))
    {
        let argString;
        if (typeof args[0] === "string") // Date constructor accepts strings too...
        {
            argString = '"' + args[0].replace(new RegExp('"'), "\\\"") + '"';
        }
        else
        {
            argString = args.join(",");
        }
        // Use eval, because http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        this.internalDate = eval("new NativeDate(" + argString + ")");
    }
    else
    {
        this.internalDate = new NativeDate(args[0].internalDate);
    }

    if (args.length === 0) // adjust to fake "now"
    {
        let realNowValue = this.internalDate.valueOf();
        let millisecondsSinceStart = realNowValue - startDate.valueOf();
        let fakeNowValue = realNowValue + factorAdjustment + millisecondsSinceStart * (speedupFactor -1); // -1 because realNowVal already contains the real time difference
        this.internalDate = new NativeDate(fakeNowValue);
    }
};

for (let i=0; i<dateInstanceMethods.length; i++)
{
    (function(){ // wrap in closure to keep scope
        let methodName = dateInstanceMethods[i];
        CustomDate.prototype[methodName] = function(){
            return this.internalDate[methodName].apply(this.internalDate, arguments);
        };
    })();
}

// Static methods...
CustomDate.now = function(){
    return new CustomDate();
};
CustomDate.parse = function(str){
    let date = new CustomDate(str);
    return date.valueOf();
};
CustomDate.UTC = function(year, month, date, hrs, min, sec, ms){
    let data = new CustomDate(year, month, date, hrs, min, sec, ms);
    return data.valueOf();
};
// -----------------

CustomDate.NativeDate = NativeDate;
CustomDate.setSpeedupFactor = function(factor){
    factorAdjustment = new CustomDate().valueOf() - startDate.valueOf();
    startDate = new NativeDate();
    speedupFactor = factor;
};

export default CustomDate;