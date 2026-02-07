-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  age text,
  phone text,
  email text, -- captured from auth or form
  school text,
  level_of_study text,
  country_of_residence text,
  linkedin_url text, -- optional
  
  -- MLH Checkboxes
  mlh_code_of_conduct boolean,
  mlh_privacy_policy boolean,
  mlh_emails boolean, -- optional

  -- Demographics (Optional)
  dietary_restrictions text,
  underrepresented_group text,
  gender text,
  pronouns text,
  race_ethnicity text,
  sexual_orientation text,
  highest_education text,
  
  -- Logistics
  tshirt_size text,
  shipping_address_line1 text,
  shipping_address_line2 text,
  shipping_city text,
  shipping_state text,
  shipping_country text,
  shipping_pincode text,
  major text,
  resume_url text, -- For potential file upload later

  constraint first_name_length check (char_length(first_name) >= 1),
  constraint last_name_length check (char_length(last_name) >= 1)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Handle user creation
-- optionally triggers to create profile on signup, but we are doing manual insertion for now
