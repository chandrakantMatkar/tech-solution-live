import React from 'react'

const ServiceItem = (props) => {
    const { service } = props;
  return (
    <div className=" col my-2 mx-2">
            <div className="card " style={{ width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <img className='itemCard' src={service.imageUrl} alt="" />
                    <p className="card-text">{service.description}</p>
                </div>
            </div>
        </div>
  )
}

export default ServiceItem