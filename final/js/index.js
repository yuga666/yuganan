/* sourced and dapted from week 8 tutorials */

window.addEventListener("load", function(){
    /* register event listeners */
    document.querySelector('#contact form').addEventListener('submit', sendmessage);
    document.querySelector('#reset_success').addEventListener('click', reset);
    document.querySelector('#reset_error').addEventListener('click', reset);
});

function sendmessage(evt) {

	/* prevent browser form submit */
    evt.preventDefault();

    /* get field values */
    var email = document.querySelector('#email').value.trim();
    var message = document.querySelector('#message').value.trim();
    
    /* get handles for error messages*/
    var hint_email = document.querySelector('#hint_email');
    var hint_subject = document.querySelector('#hint_subject');
    var hint_message = document.querySelector('#hint_message');

    /* test field values (optimistic) */
    var fields_ok = true;

    if( ! isValidEmail(email)){
        hint_email.style.display = "inline";
        fields_ok = false;
    } else {
        hint_email.style.display = "none";
    }

    if(subject.length === 0){
        hint_subject.style.display = "inline";
        fields_ok = false;
    } else {
        hint_subject.style.display = "none";
    }

    if(message.length === 0){
        hint_message.style.display = "inline";
        fields_ok = false;
    } else {
        hint_message.style.display = "none";
    }

    /* if everything is ok */
    if(fields_ok === true) {

        /* hide form and show loading icon */
        document.querySelector('#contact').style.display = 'none';
        document.querySelector('#loading').style.display = 'block';

        /* prepare data for safe transport to server */
        var data = 'email=' + encodeURIComponent(email)
                 + '&subject=' + encodeURIComponent(subject)
                 + '&message=' + encodeURIComponent(message);

                 
        /* create request object */
        var xhr = new XMLHttpRequest();

        /* add load event listener: */
        xhr.addEventListener('load', function(){
            /* hide loading icon */
            document.querySelector('#loading').style.display = 'none';

            /* log response text to console */
            console.log(xhr.responseText);

            /* if success */
            if(xhr.status == 201){
                /* show success message */
                document.querySelector('#success').style.display = 'block';
            } else {
                /* show error message */
                document.querySelector('#error').style.display = 'block';
            }
        });
        
        /* open the request */
        xhr.open('POST', 'https://kr286.brighton.domains/idm18/portfolio/js/contact.php')
        
        /* optionally: tell server what kind of data to expect */
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        /* send request data */
        xhr.send(data);
    }
    
}

function reset(evt) {
    
    /* hide everything apart from the form */
    document.querySelector('#error').style.display = 'none';
    document.querySelector('#success').style.display = 'none';
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#contact').style.display = 'block';

    /* reset form values */
    document.querySelector('#email').value = '';
    document.querySelector('#subject').value = '';
    document.querySelector('#message').value = '';    
}


function isValidEmail(txt){

    var returnValue = false;

    /* remove white space at beginning and end */
    /* e.g. 'email@example.com' */
    /*      'email@example.com' */
    var trimmedText = txt.trim();

    /* is it minimum 5 characters long? */
    /* 'x@y.z' */
    var len = trimmedText.length;
    if(len >= 5){

        /* is there an @ sign in there? */
        /* and is it's position at least 1? */
        var atPos = trimmedText.indexOf('@');
        if(atPos > 0){

            /* is there a dot (.) after the @ sign? */
            var dotPos = trimmedText.indexOf('.', atPos + 2);
            if(dotPos > atPos){

                /* is there st least 1 character after the dot? */
                if(len > dotPos + 1){

                    /* valid email address! */
                    returnValue = true;
                } else {
                    /* no character after dot */
                }
            } else {
                /* not dot (.) after @ sign */
            }
        } else {
            /* no or no valid @ sign */
        }
    } else {
        /* too short */
    }
    
    return returnValue;
}
