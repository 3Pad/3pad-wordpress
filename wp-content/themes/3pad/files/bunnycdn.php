<?php
/**
 * Bunny CDN
 */



/******BUNNY CDN*****/

//////////////////Bunny CDN TOKEN GENERATOR IMPORTANT ///////////////////
function sign_bcdn_url(
    $url,
    $securityKey,
    $expiration_time = 3600,
    $user_ip = null,
    $is_directory_token = false,
    $path_allowed = null,
    $countries_allowed = null,
    $countries_blocked = null,
    $referers_allowed = null
)
{
    if (!is_null($countries_allowed)) {
        $url .= parse_url($url, PHP_URL_QUERY) == "" ? "?" : "&";
        $url .= "token_countries={$countries_allowed}";
    }
    if (!is_null($countries_blocked)) {
        $url .= parse_url($url, PHP_URL_QUERY) == "" ? "?" : "&";
        $url .= "token_countries_blocked={$countries_blocked}";
    }
    if (!is_null($referers_allowed)) {
        $url .= parse_url($url, PHP_URL_QUERY) == "" ? "?" : "&";
        $url .= "token_referer={$referers_allowed}";
    }

    $url_scheme = parse_url($url, PHP_URL_SCHEME);
    $url_host = parse_url($url, PHP_URL_HOST);
    $url_path = parse_url($url, PHP_URL_PATH);
    $url_query = parse_url($url, PHP_URL_QUERY);

    $parameters = [];
    parse_str($url_query, $parameters);

    // Check if the path is specified and ovewrite the default
    $signature_path = $url_path;

    if (!is_null($path_allowed)) {
        $signature_path = $path_allowed;
        $parameters["token_path"] = $signature_path;
    }

    // Expiration time
    $expires = time() + $expiration_time;

    // Construct the parameter data
    ksort($parameters); // Sort alphabetically, very important
    $parameter_data = "";
    $parameter_data_url = "";
    if (sizeof($parameters) > 0) {
        foreach ($parameters as $key => $value) {
            if (strlen($parameter_data) > 0) {
                $parameter_data .= "&";
            }

            $parameter_data_url .= "&";

            $parameter_data .= "{$key}=" . $value;
            $parameter_data_url .= "{$key}=" . urlencode($value); // URL encode everything but slashes for the URL data
        }
    }

    // Generate the toke
    $hashableBase = $securityKey . $signature_path . $expires;

    // If using IP validation
    if (!is_null($user_ip)) {
        $hashableBase .= $user_ip;
    }

    $hashableBase .= $parameter_data;

    // Generate the token
    $token = hash("sha256", $hashableBase, true);
    $token = base64_encode($token);
    $token = strtr($token, "+/", "-_");
    $token = str_replace("=", "", $token);

    if ($is_directory_token) {
        return "{$url_scheme}://{$url_host}/bcdn_token={$token}&expires={$expires}{$parameter_data_url}{$url_path}";
    } else {
        return "{$url_scheme}://{$url_host}{$url_path}?token={$token}{$parameter_data_url}&expires={$expires}";
    }
}
//////////////////Bunny CDN TOKEN GENERATOR IMPORTANT ///////////////////


/******BUNNY CDN*****/