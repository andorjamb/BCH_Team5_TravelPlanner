import React from "react";
 import "./Welcome.css";
const Welcome = (props) => {
 
  return (


    <section className="row">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-8">
        <div class="card">
          <div class="card-body p-4">
            <div class="d-flex text-black">
              <div class="flex-shrink-0">

                {(props.userName)?<img src="https://source.unsplash.com/500x400/?person"
                  alt={props.userName} class="img-fluid" />:
                  <img src="https://source.unsplash.com/500x400/?avatar"
                  alt={props.userName} class="img-fluid" />
                  }
              </div>
              <div class="flex-grow-1 ms-3 ">
                <h5 class="mb-1">{props.userName || 'Guest'}</h5>
                <p class="mb-2 pb-1" >
                {props.prof || 'Profesional'}
                </p>
                <div class="d-flex justify-content-center rounded-3 p-2 mb-2 greyBackground">
                  <div>
                    <p class="small text-muted mb-1">
                    {props.cities || 'Cities'}
                    </p>
                    <p class="mb-0">2</p>
                  </div>
                  <div class="px-3">
                    <p class="small text-muted mb-1">
                    Places
                    </p>
                    <p class="mb-0">{props.trips}</p>
                  </div>
                  <div>
                    <p class="small text-muted mb-1">
                      Rating
                    </p>
                    <p class="mb-0">3.5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>







  );
};

export default Welcome;
