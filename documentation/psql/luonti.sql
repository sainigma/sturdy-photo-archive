--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: labeluuids_to_names(uuid[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.labeluuids_to_names(oglabels uuid[]) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
declare
retarray text[];
begin
for i in array_lower(oglabels,1)..array_upper(oglabels,1) loop
retarray[i] := uuid_to_label(oglabels[i]);
end loop;
return retarray;
end;
$$;


--
-- Name: username_to_uuid(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.username_to_uuid(asd text) RETURNS uuid
    LANGUAGE plpgsql
    AS $$begin
return (select id from users where users.username = asd);
end;$$;


--
-- Name: uuid_to_label(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.uuid_to_label(inputlabel uuid) RETURNS text
    LANGUAGE plpgsql
    AS $$begin
return (select name from labels where labels.id = inputlabel);
end;$$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: albums; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.albums (
    id uuid,
    name text
);


--
-- Name: asdfasdf; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.asdfasdf (
    id uuid
);


--
-- Name: cities; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.cities (
    name text COLLATE pg_catalog."fi_FI.utf8",
    id uuid,
    state text COLLATE pg_catalog."fi_FI.utf8",
    country text COLLATE pg_catalog."fi_FI.utf8"
);


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.comments (
    userid uuid,
    id uuid,
    content text COLLATE pg_catalog."fi_FI.utf8",
    children uuid[],
    "timestamp" timestamp without time zone
);


--
-- Name: labels; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.labels (
    id uuid,
    name text
);


--
-- Name: locations; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.locations (
    id uuid,
    name text COLLATE pg_catalog."fi_FI.utf8",
    description text COLLATE pg_catalog."fi_FI.utf8",
    comments uuid[],
    latitude double precision,
    longitude double precision,
    owner uuid,
    address text COLLATE pg_catalog."fi_FI.utf8",
    postalcode text,
    city uuid,
    permission uuid
);


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.permissions (
    id uuid,
    parent integer,
    child integer,
    owner uuid,
    friend integer,
    spouse integer,
    tangential integer
);


--
-- Name: photos; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.photos (
    name text,
    priority integer,
    people uuid[],
    id uuid,
    labels uuid[],
    albums uuid[],
    location uuid,
    owner uuid,
    comments uuid[],
    description text,
    equirectangular boolean,
    permissions uuid[],
    uploader uuid,
    locheight double precision,
    locazimuth double precision,
    localtitude double precision,
    locoffsetx double precision,
    locoffsety double precision,
    panorama boolean,
    timerange timestamp without time zone[],
    md5 text,
    filetype text
);


--
-- Name: userid; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.userid (
    id uuid
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.users (
    id uuid,
    name text COLLATE pg_catalog."fi_FI.utf8",
    siblings uuid[],
    children uuid[],
    parents uuid[],
    hash text,
    username text COLLATE pg_catalog."fi_FI.utf8",
    email text COLLATE pg_catalog."fi_FI.utf8",
    active boolean,
    alive boolean,
    spouses uuid[],
    friends uuid[],
    coverphoto uuid,
    location uuid,
    owner uuid
);


--
-- Name: userverification; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE public.userverification (
    username text COLLATE pg_catalog."fi_FI.utf8",
    verification text,
    "timestamp" timestamp without time zone
);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

