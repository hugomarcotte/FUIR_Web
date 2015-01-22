'use strict';

describe('Service: sms', function () {

  // load the service's module
  beforeEach(module('fuirApp'));

  // instantiate service
  var sms;
  beforeEach(inject(function (_sms_) {
    sms = _sms_;
  }));

  it('should do something', function () {
    expect(!!sms).toBe(true);
  });

});
