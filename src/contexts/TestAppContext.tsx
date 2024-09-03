// export async function fetchData(url: string) {
//     try {
//       const response = await fetch(url);
//       return await response.json();
//     } catch (error) {
//       throw new Error('Failed to fetch data');
//     }
//   }








// import React from "react";

// class AppProvider extends React.Component {
  
//     const functionOne = async (e) => {
//       try {
//         console.log("yooooo")
//       } catch (e) {
//         console.log("sorry no yooooo")

//       }
//     };
    
//     const functionTwo = async (e) => {
//         try {
//             console.log("yooooo")
//           } catch (e) {
//             console.log("sorry no yooooo")
    
//           }
//     };
  
//     render() {
//       return (
//         <TestAppContext.Provider
//           value={{
//             ....
//             functionOne: this.functionOne,
//             functionTwo: this.functionTwo,
//           }}
//         >
//        {children}
//        </TestAppContext.Provider>
//       );
//     }
//   }
//   export default AppProvider;