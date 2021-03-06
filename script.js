function classFactory(classObj) {
    const ClassObj = classObj;
    return function (...args) { return new ClassObj(...args); }
}

function handleErrors(request) {
    if (!request.ok) throw Error('Error with Fetch'); //will trigger catch
    return request;
}

class priceData {
    constructor() {
        this.priceSpan = document.querySelector('span#price');
        this.getPriceData();
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
                // console.log('found it!', JSON.parse(XHR.responseText));
                //instantiate a new price data
                self.data = JSON.parse(XHR.responseText);
                // console.log('data', self.priceSpan);
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

class randomUser {
    constructor() {
          this.img = document.querySelector('#avatar');
          this.name = document.querySelector('#fullname');
          this.username = document.querySelector('#username');
          this.description = document.querySelector('.description');
    }

    events() {
        document.querySelector('#user-btn').addEventListener('click', () => this.updateUserData());
    }

    updateUserData() {
        fetch('https://randomuser.me/api').then(handleErrors)
        .then((response) => {
            return response.json();
        }).then((data) => {
            this.data = data.results[0];
            this.render();
        }).catch(function(error) {
            console.log(error); //will post error msg from handleErrors if !request.ok
            //only runs if there is a problem with the request itself - internet connection etc.
            //will not run for a 404 code
        });
    }


    fetchPostExample() {
        fetch(url, {
            method: 'POST', //get requests do not have a body
            body: 'this is the body of the request'
            //,Headers: ByteStringValues
        })
    }

    render() {
        console.log(this.data);
        this.img.src = this.data.picture.medium;
        this.name.innerHTML = this.data.name.first + ' ' + this.data.name.last;
        this.username.innerHTML = this.data.login.username;
        this.description.querySelector('#email').innerHTML = this.data.email;
        this.description.querySelector('#city').innerHTML = this.data.location.city;

    }

}

//4 jQuery methods: $.ajax, $.get, $.post, $.getJSON
class randomCat {
    constructor() {
        this.img = document.querySelector('#cat');
        document.querySelector('#cat-btn').addEventListener('click', () => this.getCatData());
    }

    getCatData() {
        $.ajax({
            method: "Get",
            url: "https://aws.random.cat/meow",
            //dataType: 'json' - to ensure json
        }).done((response) => {
            this.img.src = response.file;
        }).fail((message) => {
             //do something
             console.log('failed:', message);
        });
    }


    //shortcuts below
    getData() {
       $.get('https://baconipsum.com/api/?type=meat-and-filler')
       .done((response) => {
            console.log('response:', response); //usually does not need to be parsed - 'intelligent guess'
       }).fail(() => {
            //do something
       });
    }

    postData() {
        $.post('https://baconipsum.com/api/?type=meat-and-filler', { name: 'Jen', city: 'Detroit'})
        .done((response) => {
             console.log('response:', response); //usually does not need to be parsed - 'intelligent guess'
        }).fail(() => {
             //do something
        })
    }

    getJSON() {
        $.getJSON('https://baconipsum.com/api/?type=meat-and-filler')
        .done((response) => {
             console.log('response:', response); //usually does not need to be parsed - 'intelligent guess'
        }).fail(() => {
             //do something
        })
    }
}

class ronSwanson {
    constructor() {
        this.span = document.querySelector('#quote');

        console.log('check the span', this.span, document.querySelector('#quote'));

        document.querySelector('#quote-btn').addEventListener('click', () => this.getRSQuote());
    }

    getRSQuote() {
        const self = this;
        const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
        axios.get(url, {
            params: {
                postId: 1 //for example only
            }
        })
        .then((result) => {
            console.log('data', result);
            self.span.innerHTML = result.data[0];
        })
        .catch(self.handleErrors);
    }

    handleErrors(err) {
        if (err.response)
            console.log('Problem with the response itself', err.response.status);
        else if (err.request)
            console.log('Problem with the request');
        else console.log('Error', err.message);
    }
}
