import http2 from 'http2';

const httpStatusConstants = http2.constants;

export const {
  HTTP_STATUS_OK, HTTP_STATUS_CREATED, HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = httpStatusConstants;
