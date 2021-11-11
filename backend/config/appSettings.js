/*
   Copyright 2018 Makoto Consulting Group, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
'use strict';

/**
 * appSettings - all relative to the project root
 */
const appSettings = {
    cloudant_db_name: 'data',
    cloudant_max_items: 200000,
    cloudant_bulk_batch_size: 10000,

    server_host: 'localhost',
    server_listen_port: 3000,
};

module.exports = appSettings;
