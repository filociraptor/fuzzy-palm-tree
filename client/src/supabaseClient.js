// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjuvicrosdasgatkrywn.supabase.co'; // Replace with your Supabase API URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdXZpY3Jvc2Rhc2dhdGtyeXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Mzc5ODAsImV4cCI6MjA2MTIxMzk4MH0.eB7xMDnXGapdNsB4omZJTFHblZ3KyfjkRdrSn7Mt4Gk'; // Replace with your anon key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
