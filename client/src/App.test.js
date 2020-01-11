import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer'
import * as actions from './actions/index.js'
import * as types from './actions/index.js'
// import expect from 'jest'
import reducer from './reducers/index.js'

import App from './App';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// describe('<App />', () => {
//   it('should match snapshot', () => {
//     const tree = renderer.create(<App />).toJSON();

//     expect(tree).toMatchSnapshot();
//   });
// });

// testing actions
// describe("fetch business actions", () => {
//   test("fetchBusiness", () => {
//     const payload = {
//       session: { sessionId: "sid" }
//     };
//     const action = fetchBusinessActions.fetchBusinessStart(payload);
//     expect(action).toEqual({
//       payload: payload,
//       type: "FETCH_BUSINESS_START"
//     });
//   });
//   test("set business", () => {
//     const payload = "drid";
//     const action = fetchBusinessActions.setDataLoading(payload);
//     expect(action).toEqual({
//       payload: payload,
//       type: "FETCH_BUSINESS_SUCCESS"
//     })
//   })
// });

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  it('created FETCH_BUSINESS_SUCCESS when fetching business has been done', () => {
    fetchMock.getOnce('/business', {
      body: { business: ['do something'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.FETCH_BUSINESS_START },
      { type: types.FETCH_BUSINESS_SUCCESS, body: { business: ['do something'] } }
    ]
    const store = mockStore({ business: [] })

    return store.dispatch(actions.yelpSearchEndpoint()).then(() => {
      // returning async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

// testing reducers

describe('business reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should handle FETCH_BUSINESS_START', () => {
    expect(
      reducer([], {
        type: types.FETCH_BUSINESS_START,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }
    ])

    expect(
      reducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
        {
          type: types.FETCH_BUSINESS_START,
          text: 'Run the tests'
        }
      )
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })
});

// test middleware

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()
  const invoke = action => thunk(store)(next)(action)
  return { store, next, invoke }
}

it('passes through non-function action', () => {
  const { next, invoke } = create()
  const action = { type: 'TEST' }
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
})
it('calls the function', () => {
  const { invoke } = create()
  const fn = jest.fn()
  invoke(fn)
  expect(fn).toHaveBeenCalled()
})
it('passes dispatch and getState', () => {
  const { store, invoke } = create()
  invoke((dispatch, getState) => {
    dispatch('TEST DISPATCH')
    getState()
  })
  expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH')
  expect(store.getState).toHaveBeenCalled()
})



// test("business fetching", () => {
//   const initialState = {
//     data: null,
//     session: { "sessionId": "sid" },
//     error: null,
//     businessFetching: false,
//     businessRequested: true
//   };
//   const action = {
//     type: "FETCH_BUSINESS_START",
//     payload: "res"
//   };
//   const newState = fetchBusiness(initialState, action);
//   expect(newState).toEqual({
//     data: null,
//     dataRequestId: "drid",
//     session: { "sessionId": "sid" },
//     error: null,
//     businessFetching: true
//   });
// });
