use std::collections::HashMap;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId};
near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize)]
struct Counter {
    state: i64,
    action: HashMap<AccountId, String>,
}

#[near_bindgen]
impl Counter {
    pub fn increase(&mut self) {
        self.state += 1;
        self.action
            .insert(env::signer_account_id(), String::from("1"));
        let log = env::signer_account_id() + " have increase the state ";
        env::log(String::from(log).as_bytes());
    }
    pub fn read(&self) -> i64 {
        self.state
    }
    pub fn get_list(&self) -> Vec<String> {
        let mut vec: Vec<String> = vec![];
        for (a, _) in self.action.iter() {
            vec.push(a.trim().to_string());
        }
        vec
    }
}
impl Default for Counter {
    fn default() -> Self {
        Self {
            state: 0,
            action: HashMap::new(),
        }
    }
}
