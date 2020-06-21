const express = require('express');
const request = require('request');
const path = require('path');
const https = require('https');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public','sign-up.html'));
});
app.get('/failure', (req,res) => {
    res.redirect('/');
})
app.post('/', (req,res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address : email,
                status : 'subscribed',
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/";
    const options = {
        method :'POST',
        auth://api key
    }

   const request = https.request(url,options, (response) => {
    if(response.statusCode === 200){
        res.sendFile(path.join(__dirname,'public','success.html'));
    }else{
        res.sendFile(path.join(__dirname,'public','failure.html'));
    }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);
    request.end();

});


PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
})






//api key


//user id
//