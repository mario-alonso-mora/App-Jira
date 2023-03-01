import axios from 'axios';


import React from 'react'

 const entriesApi =  axios.create({

    baseURL:'/api'


 })


 export default entriesApi
