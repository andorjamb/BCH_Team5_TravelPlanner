import React, { Component } from "react";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import Weather from '../../components/Weather/Weather';
import {
    collection,
    getDoc,
    getDocs,
    doc
} from "firebase/firestore";
import { db } from "../../FireBaseInit";


class Experiments extends Component {

    state = {
        response: "",
        response2: "",
        buttonValue: false,
    }

    fetchServerData = () => { //start server first
        fetch('http://localhost:8080')
            .then((res) => res.json())
            .then((data) => console.log(data));

    }

    switchButtonValue = () => {
        this.setState((state) => state.buttonValue !== this.state.buttonValue)
    }

    async fetchFirebaseData() {
        const sightRef = doc(db, 'sights', 'ChIJ-1ZkcY4LkkYRsDmSuVO1AAo');//Suomenlinna id
        const docSnap = await getDoc(sightRef);
        console.log(sightRef);
        console.log(doc);
        if (docSnap) { console.log(docSnap.data()) }
    }

    componentDidMount() {
        /*   const fetchedServerData = () => {
              let response = fetch('http://localhost:8080')
                  .then((res) => res.json());
              console.log(response);
              return (response) */
        let response = this.fetchServerData;
        this.setState({ response: response });
    }

    componentDidUpdate(currentState, exState) {
        if (this.state.buttonValue !== exState.buttonValue) {
            console.log('button value updated');
            const sightRef = doc(db, 'sights', 'ChIJ-1ZkcY4LkkYRsDmSuVO1AAo');//Suomenlinna id
            const docSnap = getDoc(sightRef);
            console.log(docSnap)//why is it fetching userinfo instead of firestore data?
            const querySnapshot = async () => { await getDocs(collection(db, "cities")) };
            querySnapshot.forEach((doc) => {
                console.log(doc.id, doc.data());
            });
        }
    }

    render() {

        return (
            <div>
                <WelcomeUser />
                <Weather
                    response={this.response}
                    clickHandler={this.fetchServerData}
                    clickHandler2={this.switchButtonValue}
                    response2={this.response2} />
            </div>
        )
    }
}

export default Experiments;
