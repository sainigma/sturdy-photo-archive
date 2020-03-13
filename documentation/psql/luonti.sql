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
-- Name: citycountry_to_uuid(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.citycountry_to_uuid(cityname text, countryname text) RETURNS uuid
    LANGUAGE plpgsql
    AS $$begin
return( select id from cities where name = cityname and ( country = countryname or ( country is null and countryname is null ) ) );
end$$;


--
-- Name: commentuuids_to_comments(uuid[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.commentuuids_to_comments(commentpointers uuid[]) RETURNS json[]
    LANGUAGE plpgsql
    AS $$declare
	retarray json[];
begin
if commentpointers is null then
	retarray := null;
else
	for i in array_lower(commentpointers,1)..array_upper(commentpointers,1) loop
	retarray[i] := uuid_to_comment( commentpointers[i] );
	end loop;
end if;
return retarray;
end;$$;


--
-- Name: labeluuids_to_labels(uuid[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.labeluuids_to_labels(labelpointers uuid[]) RETURNS json[]
    LANGUAGE plpgsql
    AS $$declare
	retarray json[];
begin
if labelpointers is null then
	retarray := null;
else
	for i in array_lower(labelpointers,1)..array_upper(labelpointers,1) loop
	retarray[i] := uuid_to_label( labelpointers[i] );
	end loop;
end if;
return retarray;
end;$$;


--
-- Name: labeluuids_to_names(uuid[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.labeluuids_to_names(oglabels uuid[]) RETURNS text[]
    LANGUAGE plpgsql
    AS $$declare
retarray text[];
begin
if oglabels is null then
	retarray := null;
else
	for i in array_lower(oglabels,1)..array_upper(oglabels,1) loop
	retarray[i] := uuid_to_label(oglabels[i]);
	end loop;
end if;
return retarray;
end;
$$;


--
-- Name: permission_to_json(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.permission_to_json(pointertopermit uuid) RETURNS json
    LANGUAGE plpgsql
    AS $$begin
return (
	select row_to_json(omittedpermissions) from 
	( select p.id, p.child, p.friend, p.parent, p.spouse, p.tangential from permissions as p where p.id = pointertopermit ) as omittedpermissions
	);
end$$;


--
-- Name: photo_is_public(uuid[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.photo_is_public(permissions uuid[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $$declare
notpublic_count integer;
friend integer;
begin
notpublic_count := 0;
if permissions is null then 
	notpublic_count  := 1;
else
	for i in array_lower(permissions,1)..array_upper(permissions,1) loop
		friend := (select per.friend from permissions as per where per.id = permissions[i]);
		if friend != -1 then
			notpublic_count := notpublic_count + 1;
		end if;
	end loop;
end if;
return notpublic_count = 0;
end;$$;


--
-- Name: pointer_to_permission(uuid[], text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pointer_to_permission(ogpermissions uuid[], username text) RETURNS uuid
    LANGUAGE plpgsql
    AS $$declare
	useruuid uuid;
	currentuser uuid;
begin
useruuid := username_to_uuid(username);
if ogpermissions is null then
	return null;
else
	for i in array_lower(ogpermissions,1)..array_upper(ogpermissions,1) loop
		currentuser := (select p.owner from permissions as p where p.id = ogpermissions[i]);
		if currentuser = useruuid then
			return ogpermissions[i];
		end if;
	end loop;
end if;
return null;
end;$$;


--
-- Name: timestamp_to_epoch(timestamp without time zone); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.timestamp_to_epoch("timestamp" timestamp without time zone) RETURNS double precision
    LANGUAGE plpgsql
    AS $$begin
	return ( select date_part('epoch',timestamp) );
end$$;


--
-- Name: toggle_likes(text, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.toggle_likes(username text, targetid uuid) RETURNS boolean
    LANGUAGE plpgsql
    AS $$declare
	was_success boolean;
	useruuid uuid;
	newlikes uuid[];
	oglikes uuid[];
begin
oglikes := (select likes from photos as p where p.id = targetid );
useruuid := username_to_uuid(username);
if useruuid is null then
	return false;
end if;
if useruuid = any(oglikes) then
	newlikes := array_remove(oglikes, useruuid);
	update photos set likes = newlikes where photos.id = targetid;
	return true;
else
	newlikes := array_append(oglikes, useruuid);
	update photos set likes = newlikes where photos.id = targetid;
	return true;
end if;
return false;
end;$$;


--
-- Name: user_has_liked(text, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.user_has_liked(username text, targetid uuid) RETURNS boolean
    LANGUAGE plpgsql
    AS $$declare
useruuid uuid;
likes uuid[];
begin
useruuid := username_to_uuid(username);
likes := (select p.likes from photos as p where p.id = targetid);
if useruuid = any( likes ) then
	return true;
else
	return false;
end if;
end;$$;


--
-- Name: username_to_uuid(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.username_to_uuid(asd text) RETURNS uuid
    LANGUAGE plpgsql
    AS $$begin
return (select id from users where users.username = asd);
end;$$;


--
-- Name: uuid_to_comment(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.uuid_to_comment(commentuuid uuid) RETURNS json
    LANGUAGE plpgsql
    AS $$begin
	return(
		select row_to_json(s)
		from (
			select
				c.id,
				uuid_to_username(c.userid) as username,
				c.content,
				timestamp_to_epoch(c.timestamp) as timestamp
			from comments as c
			where c.id = commentuuid
		) as s
	);
end;$$;


--
-- Name: uuid_to_label(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.uuid_to_label(labeluuid uuid) RETURNS json
    LANGUAGE plpgsql
    AS $$begin
	return(
		select row_to_json(s)
		from (
			select
				l.id,
				l.name
			from labels as l
			where l.id = labeluuid
		) as s
	);
end;$$;


--
-- Name: uuid_to_username(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.uuid_to_username(useruuid uuid) RETURNS text
    LANGUAGE plpgsql
    AS $$begin
return (select username from users where users.id = useruuid);
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
    filetype text,
    likes uuid[]
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

