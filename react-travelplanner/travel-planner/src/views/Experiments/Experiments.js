import React, { Component } from "react";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import Weather from '../../components/Weather/Weather'


class Experiments extends Component {

    state = {
        response: "",
    }

    fetchData() {
        let response = fetch('http://localhost:8080')
            .then((res) => res.json())
        //  .then((data) => JSON.stringify(data));
        console.log(response);
        this.setState({ response: "blabla" });

    }

    render() {

        return (
            <div>
                <WelcomeUser />
                <Weather
                    response={this.response}
                    clickHandler={this.fetchData} />
            </div>
        )
    }
}

export default Experiments;
