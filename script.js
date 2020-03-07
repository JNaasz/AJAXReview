function classFactory(classObj) {
    const ClassObj = classObj;
    return function (...args) { return new ClassObj(...args); }
  }

class priceData {
    constructor() {
        this.priceSpan = document.querySelector('span#price');
    }

    events() {
        document.querySelector('button.price').addEventListener('click', () => this.getPriceData());
    }

    getPriceData() {
        var self = this;

        var XHR = new XMLHttpRequest();
        XHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                console.log('found it!', JSON.parse(XHR.responseText));
                //instantiate a new price data
                self.data = JSON.parse(XHR.responseText);
                console.log('data', self.priceSpan);
                self.render();
            } //else reject('response not found');
        };
    
        XHR.open('GET', 'http://api.coindesk.com/v1/bpi/currentprice.json');
        XHR.send();
    }

    render() {
        this.priceSpan.innerHTML = this.data.bpi.USD.rate + ' ' + this.data.bpi.USD.code;
    }   
}

class user {

}

class documentEvents {

}


// var getFetchUpdate = new Promise(function(resolve, reject) {
//     fetch('https://randomuser.me/api').then(handleErrors)
//     .then(function(response) {
//         console.log(response);
//         resolve(response.json());
//     }).catch(function(error) {
//         console.log(error); //will post error msg from handleErrors if !request.ok
//         //only runs if there is a problem with the request itself - internet connection etc.
//         //will not run for a 404 code
//     });
// });

// function handleErrors(request) {
//     console.log(response.status, request.ok);
//         if (!request.ok) throw Error('Error with Fetch'); //will trigger catch
//         return request;
// }

// function fetchPostExample() {
//     fetch(url, {
//         method: 'POST', //get requests do not have a body
//         body: 'this is the body of the request'
//         //,Headers: ByteStringValues
//     })
// }
