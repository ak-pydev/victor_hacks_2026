-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  age numeric,
  phone text,
  email text,
  school text,
  level_of_study text,
  country_of_residence text,
  linkedin_url text,
  
  -- Demographics
  dietary_restrictions text,
  underrepresented_group text,
  gender text,
  pronouns text,
  race_ethnicity text,
  sexual_orientation text,
  
  -- Logistics
  tshirt_size text,
  shipping_address_line1 text,
  shipping_address_line2 text,
  shipping_city text,
  shipping_state text,
  shipping_country text,
  shipping_pincode text,
  major text,
  
  -- Compliance
  gdg_code_of_conduct boolean,
  victor_hacks_rules boolean,
  mlh_code_of_conduct boolean,

  primary key (id),
  unique(id),
  constraint username_length check (char_length(first_name) >= 1)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
