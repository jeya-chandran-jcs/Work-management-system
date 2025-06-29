import type React from "react";

export type TaskType={
  title:string | null,
  description : string | null,
  dueDate? :string | null,
  completedDate? :string | null
}

export interface User {
  UID: string;
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  department: string;
  image: string;
  assignTask: TaskType[];          
  completedTask: TaskType[];
  getTask: TaskType[];
  getCompletedTask: TaskType[];
}


export type SideBarType={
  type:string | null,
  date:string | null
}

export type SideBarProps={
  filter:SideBarType,
  setFilter:React.Dispatch<React.SetStateAction<SideBarType>>
}

export type SideBarFilter={
  filter:SideBarType
}

export type AdminFilter={
  search:string ,
  status:string ,
  department:string 
}

export type AdminFilterProps={
  userFilter:AdminFilter,
  setUserFilter:React.Dispatch<React.SetStateAction<AdminFilter>>
}

export type UsercompletedTask={
  UID:string,
  uuid:string,
  name:{
    title:string,
    task:string
  },
  dueDate:string,
  completedDate:string
}

export type AdminAssignTask={
  UID:string,
  uuid:string,
  name:{
    title:string,
    task:string
  },
  dueDate:string,
  assignedDate:string
}

export type UserProps={
  name:string,
  email:string,
  password:string,
  role:"employee" | "admin",
  department:string,
  getTask:[],
  completedTask:UsercompletedTask[],
  assignTask:AdminAssignTask[],
  getCompletedTasK:[],
  image:string,
  id:string | number,
  UID:string,
  confirmPassword:string
}


export type UpdateTaskProps={
   id: string;
  uuid: string | undefined;
  title: string  |undefined;
  description: string;
  dueDate: string | undefined;
  keyMessage: "assignTask" | "completedTask";
  assignedDate?: string;
  completedDate?: string;
}

export type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};


export type Paginationts<T>={
  length:number,
  itemsPerPage:number,
  currentPage:number,
  filteredTask:T[] 
}

export type ButtonProps={
  type:"submit" | "reset" | "button",
  style:string,
  handleSubmit?:React.MouseEventHandler<HTMLButtonElement>,
  text:React.ReactNode,
  disabled?:boolean
}

export type InputProps={
  name:string,
  value?:string | undefined,
  placeHolder?:string,
  id:string,
  handleChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  readOnly?:boolean,
  style:string,
  type?:string,
  checked?:boolean,
  required?:boolean,
  disabled?:boolean
}

export type ErrorModalProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
};


export type RegisterUserProps = Pick<UserProps, "UID" | "name" | "email" | "password" | "confirmPassword" | "role" | "department">

export type ColumnProps=Pick<UserProps,"id"|"name" | "email"| "department"| "role"| "completedTask" | "assignTask">

export type TableProps={
  employee:ColumnProps[],
  isLoading:boolean,
  error:unknown
}