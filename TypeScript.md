1)
// Generics Learned
1. PromiseType
2. ReturnType


2)
// Assigning typescript type to the property inside an object.
let object ={
user: {} as userType
// userType is an interface
}

3)
// use of "?" in caseOf accessing the properties inside the object
let object = null || undefined ;
if(object?.name) {} // won't give any error , but if "?" was not used it would give error


4)
// While receiving props in a component ,
// It should always be destructured and given type like below way ,
// const DashboardTable = (data:tableData[]) :: This Should Be Avoided

const DashboardTable = ({ data = [] }: { data: tableData[] }) => {
  return TableHOC(columns,data,false)();
};