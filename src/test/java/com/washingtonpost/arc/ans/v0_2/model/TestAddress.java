package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Address" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestAddress extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "address";
    }

    @Test
    public void testAddressGood() throws Exception {
        runTest("address-fixture-good", true);
    }

    @Test
    public void testAddressBadMissingName() throws Exception {
        runTest("address-fixture-bad-po-box", false);
    }
}
