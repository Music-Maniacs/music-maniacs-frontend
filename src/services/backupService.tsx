import axios from 'axios';
import { Backup } from '../models/Backup';

const backupsUrl = `${process.env.REACT_APP_API_URL}/backups`;

export async function createBackup(): Promise<void> {
  return await axios.post(`${backupsUrl}`);
}

export async function restoreBackup(backupId: string): Promise<Backup> {
  const idEncoded = backupId.replace(/\./g, '%2E');

  return (await axios.post(`${backupsUrl}/${idEncoded}/restore_backup`)).data;
}

export async function deleteBackup(backupId: string): Promise<Backup> {
  const idEncoded = backupId.replace(/\./g, '%2E');

  return (await axios.delete(`${backupsUrl}/${idEncoded}`)).data;
}
