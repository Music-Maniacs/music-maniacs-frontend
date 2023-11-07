import axios from 'axios';
import { ControllerClassNames } from '../models/Role';
import { Policy } from '../models/Policy';

const policyUrl = `${process.env.REACT_APP_API_URL}/`;

export async function navigationPolicy(): Promise<ControllerClassNames[]> {
  return (await axios.get(`${policyUrl}navigation_policy`)).data;
}

export async function checkPolicy(className: ControllerClassNames): Promise<Policy> {
  return (await axios.get(`${policyUrl}check_policy?class=${className}`)).data;
}
