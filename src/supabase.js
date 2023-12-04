import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sajzvmfcvgcysyuuxmdn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhanp2bWZjdmdjeXN5dXV4bWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzODc4ODcsImV4cCI6MjAxNDk2Mzg4N30.w3oSf7BgjfOD-kvb62Cqorf1oWnQjUiIrtm-9xIG36s'
const supabase = createClient(supabaseUrl, supabaseKey)

const createUser = async (email, password) => {
  try {
    
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

    if (error) {
      console.error('Registration failed:', error.message);
    } else {
      console.log('Registration successful:', user);
      return { user };
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};

const authenticateUser = async (email, password, isRegister) => {
  try {
    let { user, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
});

    if (error) {
      console.error('Login failed:', error.message);

      // 如果用户不存在且正在注册，则创建新用户
      if (isRegister && error.message.includes('No user found for this email')) {
        const newUser = await createUser(email, password);
        user = newUser.user;
      }
    } else {
      console.log('Login successful:', user);
    }

    // 其他逻辑...
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};

const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout failed:', error.message);
  } else {
    console.log('Logout successful');
  }
};


export { supabase, authenticateUser, createUser, signOutUser };

