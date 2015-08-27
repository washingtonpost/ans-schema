package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import org.junit.Test;
import static org.hamcrest.MatcherAssert.*;

/**
 * <p>Tests that JSON we expect to be a valid "Address" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestAddress extends AbstractTest<Address> {
    
    @Override
    String getSchemaName() {
        return "address";
    }

    @Override
    Class getTargetClass() {
        return Address.class;
    }

    @Test
    public void testAddressGood() throws Exception {
        testJsonValidation("address-fixture-good", true);
        Address address = testClassSerialization("address-fixture-good");
        assertThat(address.getStreetAddress(), is("1600 Pennsylvania Ave"));
        assertThat(address.getExtendedAddress(), is("West Wing"));
        assertThat(address.getLocality(), is("Washington, D.C."));
        assertThat(address.getPostalCode(), is("20002"));
        assertThat(address.getCountryName(), is("USA"));
    }

    @Test
    public void testAddressWithPoBox() throws Exception {
        testJsonValidation("address-fixture-good-2", true);
        Address address = testClassSerialization("address-fixture-good-2");
        assertThat(address.getStreetAddress(), is("10 Downing Street"));
        assertThat(address.getRegion(), is("London"));
        assertThat(address.getPostOfficeBox(), is("109101"));
        assertThat(address.getAdditionalProperties().get("foo"), is("bar"));
    }

    @Test
    public void testAddressBadMissingName() throws Exception {
        testJsonValidation("address-fixture-bad-po-box", false);
    }
}
