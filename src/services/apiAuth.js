import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error("fail to login ");
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    throw new Error("Could not get user");
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw new Error("Could not log out");
  }
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.log(error);
    throw new Error("fail to sign up");
  }
  console.log(data);
  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  let updateDate;
  if (password) updateDate = { password };
  if (fullName) updateDate = { data: { fullName } };
  //Update password or fullName
  const { data, error } = await supabase.auth.updateUser(updateDate);
  if (error) {
    console.log(error);
    throw new Error("fail to Update current User");
  }
  if (!avatar) return data;
  //upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (avatarError) {
    console.log(avatarError);
    throw new Error("Avatar image could not be created");
  }
  //update avatar in user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) {
    console.log(error2);
    throw new Error("fail to Update User avatar");
  }

  return updatedUser;
}
