//Oath2 Library used to generate the accesstoken for the Google ads API

/**
 * Executes an Apps Script function in a remote Apps Script.
 * See: https://developers.google.com/google-ads/scripts/docs/features/third-party-apis#refresh_token_grant
 * for details on configuring this script.
 *
 * NOTE: This script also requires the OAuth2 library to be pasted at the end,
 * as obtained from https://developers.google.com/google-ads/scripts/docs/examples/oauth20-library
 */
var CLIENT_ID = '';
var CLIENT_SECRET = '';
var REFRESH_TOKEN = '';
// Enter scopes which should match scopes in File > Project properties
// For this project, e.g.: https://www.googleapis.com/auth/adwords
var SCOPES = ''
// Script ID taken from 'File > Project Properties'
var SCRIPT_ID = 'ENTER_SCRIPT_ID';

var authUrlFetch;

// Call this function just once, to initialize the OAuth client.
function initializeOAuthClient() {
  if (typeof OAuth2 === 'undefined') {
    var libUrl = 'https://developers.google.com/google-ads/scripts/docs/examples/oauth20-library';
    throw Error('OAuth2 library not found. Please take a copy of the OAuth2 ' +
      'library from ' + libUrl + ' and append to the bottom of this script.');
  }
  var tokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var authUrlFetch = OAuth2.withRefreshToken(tokenUrl, CLIENT_ID, CLIENT_SECRET,
    REFRESH_TOKEN, SCOPES);
  // Logger.log(authUrlFetch.accessToken_)
  return authUrlFetch.accessToken_
}

/**
 * Execute a remote function.
 * @param {string} remoteFunctionName The name of the function to execute.
 * @param {Object[]} functionParams An array of JSON objects to pass to the
 *     remote function.
 * @return {?Object} The return value from the function.
 */
function executeRemoteFunction(remoteFunctionName, functionParams) {
  var apiParams = {
    'function': remoteFunctionName,
    'parameters': functionParams
  };
  var httpOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(apiParams)
  };
  var url = 'https://script.googleapis.com/v1/scripts/' + SCRIPT_ID + ':run';
  var response = authUrlFetch.fetch(url, httpOptions);
  var data = JSON.parse(response.getContentText());
  // Retrieve the value that has been returned from the execution.
  if (data.error) {
    throw Error('There was an error: ' + response.getContentText());
  }
  return data.response.result;
}

// Paste in OAuth2 library here, from:
// https://developers.google.com/google-ads/scripts/docs/examples/oauth20-library

/**
 * Simple library for sending OAuth2 authenticated requests.
 * See: https://developers.google.com/google-ads/scripts/docs/features/third-party-apis#oauth_2
 * for full details.
 */

/**
 * Adds a OAuth object, for creating authenticated requests, to the global
 * object.
 */
(function (scope) {
  /**
   * Creates an object for making authenticated URL fetch requests with a
   * given stored access token.
   * @param {string} accessToken The access token to store and use.
   * @constructor
   */
  function OAuth2UrlFetchApp(accessToken) { this.accessToken_ = accessToken; }

  /**
   * Performs an HTTP request for the given URL.
   * @param {string} url The URL to fetch
   * @param {?Object=} options Options as per UrlFetchApp.fetch
   * @return {!HTTPResponse} The HTTP Response object.
   */
  OAuth2UrlFetchApp.prototype.fetch = function (url, opt_options) {
    var fetchOptions = opt_options || {};
    if (!fetchOptions.headers) {
      fetchOptions.headers = {};
    }
    fetchOptions.headers.Authorization = 'Bearer ' + this.accessToken_;
    return UrlFetchApp.fetch(url, fetchOptions);
  };

  /**
   * Performs the authentication step
   * @param {string} tokenUrl The endpoint for use in obtaining the token.
   * @param {!Object} payload The authentication payload, typically containing
   *     details of the grant type, credentials etc.
   * @param {string=} opt_authHeader Client credential grant also can make use
   *     of an Authorisation header, as specified here
   * @param {string=} opt_scope Optional string of spaced-delimited scopes.
   * @return {string} The access token
   */
  function authenticate_(tokenUrl, payload, opt_authHeader, opt_scope) {
    var options = { muteHttpExceptions: true, method: 'POST', payload: payload };
    if (opt_scope) {
      options.payload.scope = opt_scope;
    }
    if (opt_authHeader) {
      options.headers = { Authorization: opt_authHeader };
    }
    var response = UrlFetchApp.fetch(tokenUrl, options);
    var responseData = JSON.parse(response.getContentText());
    if (responseData && responseData.access_token) {
      var accessToken = responseData.access_token;
    } else {
      throw Error('No access token received: ' + response.getContentText());
    }
    Logger.log(accessToken)
    return accessToken;
  }

  /**
   * Creates a OAuth2UrlFetchApp object having authenticated with a refresh
   * token.
   * @param {string} tokenUrl The endpoint for use in obtaining the token.
   * @param {string} clientId The client ID representing the application.
   * @param {string} clientSecret The client secret.
   * @param {string} refreshToken The refresh token obtained through previous
   *     (possibly interactive) authentication.
   * @param {string=} opt_scope Space-delimited set of scopes.
   * @return {!OAuth2UrlFetchApp} The object for making authenticated requests.
   */
  function withRefreshToken(
    tokenUrl, clientId, clientSecret, refreshToken, opt_scope) {
    var payload = {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken
    };
    var accessToken = authenticate_(tokenUrl, payload, null, opt_scope);
    return new OAuth2UrlFetchApp(accessToken);
  }

  /**
   * Creates a OAuth2UrlFetchApp object having authenticated with client
   * credentials.
   * @param {string} tokenUrl The endpoint for use in obtaining the token.
   * @param {string} clientId The client ID representing the application.
   * @param {string} clientSecret The client secret.
   * @param {string=} opt_scope Space-delimited set of scopes.
   * @return {!OAuth2UrlFetchApp} The object for making authenticated requests.
   */
  function withClientCredentials(tokenUrl, clientId, clientSecret, opt_scope) {
    var authHeader =
      'Basic ' + Utilities.base64Encode([clientId, clientSecret].join(':'));
    var payload = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    };
    var accessToken = authenticate_(tokenUrl, payload, authHeader, opt_scope);
    return new OAuth2UrlFetchApp(accessToken);
  }

  /**
   * Creates a OAuth2UrlFetchApp object having authenticated with OAuth2 username
   * and password.
   * @param {string} tokenUrl The endpoint for use in obtaining the token.
   * @param {string} clientId The client ID representing the application.
   * @param {string} username OAuth2 Username
   * @param {string} password OAuth2 password
   * @param {string=} opt_scope Space-delimited set of scopes.
   * @return {!OAuth2UrlFetchApp} The object for making authenticated requests.
   */
  function withPassword(tokenUrl, clientId, username, password, opt_scope) {
    var payload = {
      grant_type: 'password',
      client_id: clientId,
      username: username,
      password: password
    };
    var accessToken = authenticate_(tokenUrl, payload, null, opt_scope);
    return new OAuth2UrlFetchApp(accessToken);
  }

  /**
   * Creates a OAuth2UrlFetchApp object having authenticated as a Service
   * Account.
   * Flow details taken from:
   *     https://developers.google.com/identity/protocols/OAuth2ServiceAccount
   * @param {string} tokenUrl The endpoint for use in obtaining the token.
   * @param {string} serviceAccount The email address of the Service Account.
   * @param {string} key The key taken from the downloaded JSON file.
   * @param {string} scope Space-delimited set of scopes.
   * @return {!OAuth2UrlFetchApp} The object for making authenticated requests.
   */
  function withServiceAccount(tokenUrl, serviceAccount, key, scope) {
    var assertionTime = new Date();
    var jwtHeader = '{"alg":"RS256","typ":"JWT"}';
    var jwtClaimSet = {
      iss: serviceAccount,
      scope: scope,
      aud: tokenUrl,
      exp: Math.round(assertionTime.getTime() / 1000 + 3600),
      iat: Math.round(assertionTime.getTime() / 1000)
    };
    var jwtAssertion = Utilities.base64EncodeWebSafe(jwtHeader) + '.' +
      Utilities.base64EncodeWebSafe(JSON.stringify(jwtClaimSet));
    var signature = Utilities.computeRsaSha256Signature(jwtAssertion, key);
    jwtAssertion += '.' + Utilities.base64Encode(signature);
    var payload = {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwtAssertion
    };
    var accessToken = authenticate_(tokenUrl, payload, null);
    return new OAuth2UrlFetchApp(accessToken);
  }

  scope.OAuth2 = {
    withRefreshToken: withRefreshToken,
    withClientCredentials: withClientCredentials,
    withServiceAccount: withServiceAccount,
    withPassword: withPassword
  };
})(this);
