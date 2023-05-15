
// https://testing-library.com/docs/react-testing-library/example-intro/


// import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import "@testing-library/jest-dom/extend-expect";
// import { sendWordToServer } from '../../api/api';
// import AddingWord from './AddingWord';

// jest.mock('../api/api', () => ({
//   __esModule: true,
//   sendWordsToServer: jest.fn(() => Promise.resolve({ status: 200 })),
// }));

// console.log("AddingWord>>>", AddingWord);

// console.log("-----------", sendWordsToServer());

// import moduleName, {foo} from '../moduleName';

// jest.mock('../moduleName', () => {
//   return {
//     __esModule: true,
//     default: jest.fn(() => 42),
//     foo: jest.fn(() => 43),
//   };
// });

// moduleName(); // Will return 42
// foo(); // Will return 43


// https://stackoverflow.com/questions/51167871/use-imported-variables-in-jest-mock-function
// api.sendWordsToServer = () => Promise.resolve({ status: 200 });

// const NOW = +new Date(2020, 1, 1);

// jest
//   .useFakeTimers()
//   .setSystemTime(NOW);

// test('controlled component', () => {

//   const sendWordsToServer = jest.fn(() => Promise.resolve({ status: 200 }));

//     render(<AddingWord sendWordsToServer={sendWordsToServer} />)

//     console.log('1>>', sendWordsToServer.mock)
    
//     userEvent.type(screen.getByLabelText('eng'), 'Hello')
//     userEvent.type(screen.getByLabelText('rus'), 'привет')
//     userEvent.type(screen.getByLabelText('example'), 'Привет мир')
//     userEvent.click(screen.getByText('Add'))
//     console.log('2>>', sendWordsToServer.mock)

//     expect(sendWordsToServer).toBeCalledTimes(1)
//     expect(sendWordsToServer).toBeCalledWith({
//       englishVersion: 'Hello',
//       rusVersion: 'привет',
//       example: 'Привет мир',
//       mark: false,
//       date: NOW
//     })
    
//     // https://jestjs.io/docs/es6-class-mocks#replacing-the-mock-using-mockimplementation-or-mockimplementationonce
//     // https://dev.to/dstrekelj/how-to-mock-imported-functions-with-jest-3pfl#:~:text=To%20mock%20an%20imported%20function%20with%20Jest%20we%20use%20the,the%20module%20we're%20mocking.
//     // expect(screen.getByLabelText('eng')).toHaveValue('Hello')
//   })