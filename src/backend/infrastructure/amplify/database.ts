"use server"

import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import config from '@/amplifyconfiguration.json';
import { cookies } from 'next/headers';

export const getDbClient = async () => {
  return generateServerClientUsingCookies({
    config,
    cookies
  });
}