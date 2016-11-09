import superagent             from 'superagent';
import * as es6Promise        from 'es6-promise';
import Interceptors           from './Interceptors';
import config                 from '../config';

es6Promise.polyfill();

const methods = ['get', 'post', 'put', 'patch', 'del'];

export default class Request extends Interceptors {

  constructor(){

      super();

      methods.forEach( (method) => {

        this[method] = ( path, data, query ) => {

          return new Promise( ( resolve, reject ) => {
              
              const url = `${config.host}${path}`;

              const request = superagent[method]( url );

              super.setHeaders( request );

              if( query ) request.query( query );

              request.send( data );

              super.interceptResponse( request, resolve, reject );

          } )

        }

      } )

  }

  fetch( path, { method, data, query }){

      return this[ method ]( path, data, query );

  }

}
