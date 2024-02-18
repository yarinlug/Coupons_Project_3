import axios from "axios";
import Company from "../Models/Company";
import Customer from "../Models/Customer";
import { companyStore } from "../Redux/OurStore";
import { add, fill, remove, update } from "../Redux/CompanySlice";



class AdminService {
    public async getAllCompanies(): Promise<Company[]> {
        if (companyStore.getState().value.length == 0) {
            const response = (await axios.get<Company[]>("http://localhost:8080/admin/companies"))
            companyStore.dispatch(fill(response.data))
            return response.data
        } else {
            return companyStore.getState().value
        }
    }
    // const response = (await axios.get<Company[]>("http://localhost:8080/admin/companies"))
    // return response.data;

    public async getAllCustomers(): Promise<Customer[]> {
        const response = (await axios.get<Customer[]>("http://localhost:8080/admin/customers"))
        return response.data;
    }

    public async getOneCompany(id: number): Promise<Company> {
        const response = (await axios.get<Company>("http://localhost:8080/admin/companies/" + id))
        return response.data;
    }

    public async getOneCustomer(id: number): Promise<Customer> {
        const response = (await axios.get<Customer>("http://localhost:8080/admin/customer/" + id))
        return response.data;
    }

    public async addCustomer(customer: Customer): Promise<Customer> {
        const response = await axios.post<Customer>("http://localhost:8080/admin/addcustomer", customer);
        return response.data;
    }

    public async addCompany(company: Company): Promise<Company> {
        const response = (await axios.post<Company>("http://localhost:8080/admin/addcompany", company));
        companyStore.dispatch(add(response.data))
        return response.data;
    }

    public async updateCompany(company: Company): Promise<Company> {
        const data = (await axios.put<Company>("http://localhost:8080/admin/updatecompany", company)).data
        companyStore.dispatch(update(company))
        return data;

    }

    public async updateCustomer(customer: Customer): Promise<Customer> {
        const response = await axios.put<Customer>("http://localhost:8080/admin/updatecustomer", customer);
        return response.data;
    }

    public async deleteCompany(id: any): Promise<string> {
        companyStore.dispatch(remove(id))
        const response = await axios.delete<string>("http://localhost:8080/admin/deletecompany/" + id)
        return response.data
    }

    public async deleteCustomer(id: any): Promise<string> {
        const response = (await axios.delete<string>("http://localhost:8080/admin/deletecustomer/" + id))
        return response.data;

    }
}
const adminService = new AdminService
export default adminService;