package com.washingtonpost.arc.ans;

import static com.washingtonpost.arc.ans.ANSVersion.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import org.junit.Test;

/**
 * <p>Tests the ANSVersion enumeration</p>
 */
public class TestANSVersion {

    @Test
    public void testFromString() {
        assertEquals(V0_2_0, ANSVersion.fromString("0.2"));
        assertEquals(V0_3_0, ANSVersion.fromString("0.3"));
        assertEquals(V0_3_1, ANSVersion.fromString("0.3.1"));
        assertEquals(V0_3_2, ANSVersion.fromString("0.3.2"));
        assertEquals(V0_4_0, ANSVersion.fromString("0.4"));
    }

    @Test(expected=IllegalArgumentException.class)
    public void testFromStringUnknownVersion() {
        ANSVersion.fromString("0.1");
    }

    // This functionality is just to be accomodating to JSON/mockers who will often gin up a Story without 100% of the fields
    public void testNullStringMakesNullVersion() {
        assertNull(ANSVersion.fromString(null));
    }

    // This functionality is just to be accomodating to JSON/mockers who will often gin up a Story without 100% of the fields
    public void testEmptyStringMakesNullVersion() {
        assertNull(ANSVersion.fromString(""));
    }
}
