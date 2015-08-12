package com.washingtonpost.arc.ans.v0_2.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Geo" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestGeo extends AbstractTest<Geo> {
    
    @Override
    String getSchemaName() {
        return "geo";
    }

    @Override
    Class getTargetClass() {
        return Geo.class;
    }

    @Test
    public void testGeoGood() throws Exception {
        testJsonValidation("geo-fixture-good", true);
        Geo geo = testClassSerialization("geo-fixture-good");
        assertThat(geo.getLatitude(), is(38.9047));
        assertThat(geo.getLongitude(), is(-77.0164));
    }

    @Test
    public void testGeoBadMissingName() throws Exception {
        testJsonValidation("geo-fixture-bad-not-a-number", false);
    }
}
