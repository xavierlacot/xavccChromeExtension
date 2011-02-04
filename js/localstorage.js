function getPreferences()
{
    var result = {
            auto_copy : false,
        };

    var localStorageItem = localStorage.getItem("preferences");

    if (localStorageItem == undefined)
        setPreferences(result);
    else
    {
        var temp = JSON.parse(localStorageItem);
        
        if (temp.auto_copy == undefined)
            temp.auto_copy = result.auto_copy;
            
        setPreferences(temp);
        result = temp;
    }
         
    return result;
}

function setPreferences(value)
{
    localStorage.setItem("preferences", JSON.stringify(value));
}

function clearLocalStorage()
{
    localStorage.clear();
}

function checkLocalStorage()
{
    if (window.localStorage == null) 
    {
        alert("LocalStorage must be enabled for changing options.");
        return false;
    }
    return true;
}