export default class Interceptors {

  setHeaders(request){

      this._setAccessTokenHeader(request);

      this._setDefaultHeaders(request);

  }

  interceptResponse( request, resolve, reject ){

      request.end( ( error, response ) => {

          if( error ) this._handleError( response, reject );

          return resolve( response.body );

      } )

  }

  _handleError( response, reject ){

      if( response.status === 401 ){
          //browserHistory.push("/login");
      }

      return reject( response.body );

  }

  _setAccessTokenHeader(request){

      let authData;

      if( authData &&  authData.api_token ){

          request.set('X-Access-Token', authData.api_token );

      }

  }

  _setDefaultHeaders(request){

      request.set('Accept', 'application/json');

      request.set('Content-Type', 'application/json');

  }

}
