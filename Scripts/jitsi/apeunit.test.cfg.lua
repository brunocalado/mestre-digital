plugin_paths = { "/usr/share/jitsi-meet/prosody-plugins/" }

-- domain mapper options, must at least have domain base set to use the mapper
muc_mapper_domain_base = "apeunit.test";

turncredentials_secret = "TURN_SECRET";

turncredentials = {
  { type = "stun", host = "apeunit.test", port = "443" },
  { type = "turn", host = "apeunit.test", port = "443", transport = "udp" },
  { type = "turns", host = "apeunit.test", port = "443", transport = "tcp" }
};

cross_domain_bosh = false;
consider_bosh_secure = true;

VirtualHost "apeunit.test"
        -- enabled = false -- Remove this line to enable this host
        authentication = "internal_plain"
        -- Properties below are modified by jitsi-meet-tokens package config
        -- and authentication above is switched to "token"
        --app_id="example_app_id"
        --app_secret="example_app_secret"
        -- Assign this host a certificate for TLS, otherwise it would use the one
        -- set in the global section (if any).
        -- Note that old-style SSL on port 5223 only supports one certificate, and will always
        -- use the global one.
        ssl = {
                key = "/etc/prosody/certs/apeunit.test.key";
                certificate = "/etc/prosody/certs/apeunit.test.crt";
        }
        speakerstats_component = "speakerstats.apeunit.test"
        conference_duration_component = "conferenceduration.apeunit.test"
        -- we need bosh
        modules_enabled = {
            "bosh";
            "pubsub";
            "ping"; -- Enable mod_ping
            "speakerstats";
            "turncredentials";
            "conference_duration";
        }
        c2s_require_encryption = false

Component "conference.apeunit.test" "muc"
    storage = "null"
    modules_enabled = {
        "muc_meeting_id";
        "muc_domain_mapper";
        -- "token_verification";
    }
    admins = { "focus@auth.apeunit.test" }

-- internal muc component
Component "internal.auth.apeunit.test" "muc"
    storage = "null"
    modules_enabled = {
      "ping";
    }
    admins = { "focus@auth.apeunit.test", "jvb@auth.apeunit.test" }

VirtualHost "auth.apeunit.test"
    ssl = {
        key = "/etc/prosody/certs/auth.apeunit.test.key";
        certificate = "/etc/prosody/certs/auth.apeunit.test.crt";
    }
    authentication = "internal_plain"

Component "focus.apeunit.test"
    component_secret = "JICOFO_SECRET"

Component "speakerstats.apeunit.test" "speakerstats_component"
    muc_component = "conference.apeunit.test"

Component "conferenceduration.apeunit.test" "conference_duration_component"
    muc_component = "conference.apeunit.test"

VirtualHost "guest.apeunit.test"	
    authentication = "anonymous"	
    c2s_require_encryption = false