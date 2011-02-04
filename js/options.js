function save()
{
    if(!checkLocalStorage())
        return;
    
    clearLocalStorage();
    
    setPreferences({
        auto_copy : $("#auto-copy").is(':checked')
    });
}

function init()
{
    if(!checkLocalStorage())
  		return;
    
    var preferences = getPreferences();
    
    if (preferences.auto_copy)
        $("auto_copy").attr('checked', true);
    else
        $("auto_copy").attr('checked', false);
}